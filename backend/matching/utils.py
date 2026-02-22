def calculate_compatibility_score(user, trip):
    """
    Calculates a matching score (0-100) between a User and a Trip.
    Based on: Budget similarity, Travel style match.
    """
    score = 0
    max_score = 100

    if not user:
        return 0

    # 1. Travel Style Match (40 pts)
    if user.travel_style and trip.travel_style:
        if user.travel_style == trip.travel_style:
            score += 40
        else:
            # Partial match mapping could be done here 
            # e.g. backpacking vs budget -> 20 pts
            if (user.travel_style == 'budget' and trip.travel_style == 'backpacking') or \
               (user.travel_style == 'backpacking' and trip.travel_style == 'budget'):
                score += 20
            elif (user.travel_style == 'mid_range' and trip.travel_style in ['budget', 'luxury']):
                score += 10
            else:
                score += 0
    else:
        # Give some leeway if incomplete profile
        score += 20 

    # 2. Budget Match (40 pts)
    # Trip budget is Decimal. User budget range is string, e.g. "500-1000"
    user_budget = user.budget_range
    trip_budget = float(trip.budget)

    if user_budget:
        try:
            if '-' in user_budget:
                min_b, max_b = map(float, user_budget.split('-'))
            else:
                min_b = float(user_budget.replace('+', '')) - 100
                max_b = float(user_budget.replace('+', '')) + 1000 # arbitrary high

            # Full overlap
            if min_b <= trip_budget <= max_b:
                score += 40
            # Close by 20%
            elif (min_b * 0.8) <= trip_budget <= (max_b * 1.2):
                score += 20
            # Way off
            else:
                score += 0
        except ValueError:
            score += 20 # Can't parse, give default
    else:
        score += 20 # No user preference

    # 3. Base verification & Quality (20 pts)
    # If the trip creator is verified or has a good rating, boost compatibility slightly, 
    # as verified/safe trips are generally widely compatible
    creator = trip.created_by
    if creator.is_verified:
        score += 10
    if creator.rating >= 4.0:
        score += 10

    # Cap score
    return min(100, max(0, score))
